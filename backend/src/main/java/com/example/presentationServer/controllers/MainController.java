package com.example.presentationServer.controllers;

import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import com.example.presentationServer.dto.AddOrderDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PostMapping;
import com.example.presentationServer.entites.PartnerEntity;
import com.example.presentationServer.entites.CompanyEntity;
import com.example.presentationServer.services.OrderService;
import com.example.presentationServer.responses.ListResponse;
import com.example.presentationServer.responses.BaseResponse;
import com.example.presentationServer.services.PartnerService;
import com.example.presentationServer.services.CompanyService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.presentationServer.responses.ObjectResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/presentation.site")
public class MainController {
  private final OrderService orderService;
  private final CompanyService companyService;
  private final PartnerService partnerService;

  @PostMapping
  public ResponseEntity<BaseResponse> addOrder(
      @RequestBody AddOrderDto addOrderDto
  ) {
    try{
      orderService.addOrder(addOrderDto);
      log.info("Add Order from User: {}", addOrderDto.name());
    } catch (Exception e) {
      log.warn("Error: {}", e.getMessage());
      return ResponseEntity.badRequest().body(
          BaseResponse.getDefaultBad(e.getMessage())
      );
    }

    return ResponseEntity.ok(
        BaseResponse.getDefaultOk("Успешно")
    );
  }

  @GetMapping
  public ResponseEntity<BaseResponse> getCompany(){
    ObjectResponse<CompanyEntity> response = new ObjectResponse<>(
        BaseResponse.getDefaultOk("Успешно"),
        companyService.getCompany()
    );
    return ResponseEntity.ok(response);
  }

  @GetMapping("/partners")
  public ResponseEntity<BaseResponse> getAllPartners(){
    ListResponse<PartnerEntity> response = new ListResponse<>(
        BaseResponse.getDefaultOk("Успешно"),
        partnerService.getAll()
    );

    return ResponseEntity.ok(response);
  }
}
