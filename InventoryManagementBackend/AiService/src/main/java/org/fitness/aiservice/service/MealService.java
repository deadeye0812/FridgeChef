package org.fitness.aiservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import dev.langchain4j.data.message.UserMessage;
import dev.langchain4j.model.chat.ChatModel;
import dev.langchain4j.model.chat.request.ChatRequest;
import dev.langchain4j.model.chat.request.ResponseFormat;
import dev.langchain4j.model.chat.request.ResponseFormatType;
import dev.langchain4j.model.chat.request.json.JsonArraySchema;
import dev.langchain4j.model.chat.request.json.JsonObjectSchema;
import dev.langchain4j.model.chat.request.json.JsonSchema;
import dev.langchain4j.model.chat.response.ChatResponse;
import org.fitness.aiservice.model.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealService {

    private final ChatModel chatModel;

    public MealService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String greetGemini() {
        return chatModel.chat("Hello Gemini!");
    }

    private JsonArraySchema getProductJsonArraySchema() {
        JsonObjectSchema productSchema = JsonObjectSchema.builder()
                .addStringProperty("name")
                .addStringProperty("category")
                .addIntegerProperty("stock")
                .addNumberProperty("caloriesPerUnit")
                .addNumberProperty("proteinsPerUnit")
                .addNumberProperty("fatsPerUnit")
                .addNumberProperty("carbsPerUnit")
                .addNumberProperty("sugarsPerUnit")
                .addNumberProperty("saltsPerUnit")
                .required("name", "category", "caloriesPerUnit", "proteinsPerUnit", "fatsPerUnit", "carbsPerUnit", "sugarsPerUnit")
                .build();

        return JsonArraySchema.builder()
                .items(productSchema).build();
    }

    private String objToJson(Object object) {
        String productsJson = "";

        try {
            ObjectMapper mapper = new ObjectMapper();
            productsJson = mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return productsJson;
    }

    public String getResultRecipes(List<Product> products) {

        String productsJson = objToJson(products);

        JsonArraySchema productsSchema = getProductJsonArraySchema();

        //JSON Response Format for Gemini
        ResponseFormat responseFormat = ResponseFormat.builder()
                .type(ResponseFormatType.JSON)
                .jsonSchema(JsonSchema.builder().name("Product").rootElement(productsSchema).build())
                .build();

        //Request that gets sent to Gemini with our standard message and the format that we should get in response
        ChatRequest chatRequest = ChatRequest.builder()
                .responseFormat(responseFormat)
                .messages(List.of(UserMessage.from("""
                        You are a chef! You are gonna receive multiple Products in JSON Form which are in my fridge.
                        I want you to generate me different meals by combining those Products.
                        It is important that those meals that you are generating, actually has got eaten by somebody in the internet.
                        
                        It is also very important that you answer me in German!!! (NOT ENGLISH)
                        
                        Products (JSON):
                        %s
                        """.formatted(productsJson))))
                .build();

        ChatResponse chatResponse = chatModel.chat(chatRequest);

        return chatResponse.aiMessage().text();
    }
}
