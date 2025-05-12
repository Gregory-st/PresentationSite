package com.example.presentationServer.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.presentationServer.model.ContactsModel;
import com.example.presentationServer.services.ContactService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.presentationServer.responses.ObjectResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/presentation.site/contacts")
public class ContactsController {
  private final ContactService contactService;

  @GetMapping
  public ResponseEntity<ObjectResponse<ContactsModel>> getContact() {
    return ResponseEntity.ok(
        new ObjectResponse<>(ObjectResponse.getDefaultOk("Успешно"), contactService.getContact())
    );
  }
}
