package com.example.presentationServer.controllers;

import com.example.presentationServer.responses.BaseResponse;
import com.example.presentationServer.responses.ObjectResponse;
import com.example.presentationServer.services.ProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequiredArgsConstructor
@RequestMapping("/presentation.site/products")
public class ProductsController {
  private final ProductsService productsService;

  @GetMapping
  public ResponseEntity<BaseResponse> getProducts(){
    return ResponseEntity.ok( BaseResponse.getDefaultOk("ds")
    );
  }
}
