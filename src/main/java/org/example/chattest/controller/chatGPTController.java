package org.example.chattest.config;

import org.example.chattest.dto.ChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class chatGPTController {

    @Value("${openai.api.key}")
    private String openapikey;

    ChatResponse response = webClient.post()
            .contentType(MediaType.APPLICATION_JSON)
            .headers(h -> h.setBearerAuth(openapikey))
            .bodyValue(chatRequest)
            .retrieve()
            .bodyToMono(ChatResponse.class)
            .block();

}
