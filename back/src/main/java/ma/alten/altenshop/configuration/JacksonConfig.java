package ma.alten.altenshop.configuration;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import ma.alten.altenshop.enums.InventoryStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class JacksonConfig {
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.configure(DeserializationFeature.READ_ENUMS_USING_TO_STRING, true);

        SimpleModule module = new SimpleModule();
        module.addDeserializer(InventoryStatus.class, new JsonDeserializer<InventoryStatus>() {
            @Override
            public InventoryStatus deserialize(JsonParser p, DeserializationContext ctxt)
                    throws IOException {
                String value = p.getValueAsString();
                return InventoryStatus.valueOf(value);
            }
        });

        mapper.registerModule(module);
        return mapper;
    }
}