package com.example.presentationServer.controllers;

import com.example.presentationServer.model.ContactsModel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import com.example.presentationServer.services.ContactService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.presentationServer.responses.ObjectResponse;

@RestController
@RequestMapping("/presentation.site/contacts")
@RequiredArgsConstructor
public class ContactsController {
  private final ContactService contactService;

  @GetMapping
  public ResponseEntity<ObjectResponse<ContactsModel>> getContact() {
    return ResponseEntity.ok(
        new ObjectResponse<>(ObjectResponse.getDefaultOk("Успешно"), contactService.getContact())
    );
  }
}
