package com.example.presentationServer.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.example.presentationServer.dto.AddOrderDto;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.presentationServer.services.OrderService;
import com.example.presentationServer.responses.BaseResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/presentation.site")
public class MainController {
  private final OrderService orderService;

  @PostMapping
  public ResponseEntity<BaseResponse> AddOrder(
      @RequestBody AddOrderDto addOrderDto
  ) {
    try{
      orderService.addOrder(addOrderDto);
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(
          BaseResponse.getDefaultBad(e.getMessage())
      );
    }

    return ResponseEntity.ok(
        BaseResponse.getDefaultOk("Успешно")
    );
  }
}
