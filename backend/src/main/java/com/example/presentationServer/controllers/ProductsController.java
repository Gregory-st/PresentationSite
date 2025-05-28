package com.example.presentationServer.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.presentationServer.entites.ServiceEntity;
import com.example.presentationServer.responses.ListResponse;
import com.example.presentationServer.responses.BaseResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.presentationServer.services.ProductsService;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/presentation.site/services")
public class ProductsController {
  private final ProductsService productsService;

  @GetMapping
  public ResponseEntity<BaseResponse> getProducts(){
    ListResponse<ServiceEntity> response = new ListResponse<>(
        BaseResponse.getDefaultOk("Успешно"),
        productsService.getAll()
    );

    return ResponseEntity.ok(response);
  }
}
