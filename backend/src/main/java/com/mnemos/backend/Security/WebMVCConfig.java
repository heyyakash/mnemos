package com.mnemos.backend.Security;

import com.mnemos.backend.middleware.AuthenticatedFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMVCConfig implements WebMvcConfigurer {
    @Autowired
    private AuthenticatedFilter authenticatedFilter;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(authenticatedFilter)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/auth/**");
    }
}
