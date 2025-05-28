package com.example.presentationServer.services;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.presentationServer.model.ContactsModel;
import com.example.presentationServer.entites.ContactEntity;
import com.example.presentationServer.entites.LinksContactEntity;
import com.example.presentationServer.repositories.ContactRepository;
import com.example.presentationServer.repositories.LinksContactRepository;

@Service
@RequiredArgsConstructor
public class ContactService {
  private final ContactRepository contactRepository;
  private final LinksContactRepository linksContactRepository;

  public ContactsModel getContact() {
    ContactEntity contactEntity = contactRepository.findByStep(1)
        .orElseThrow();
    List<LinksContactEntity> links = linksContactRepository.findAllByContactId(contactEntity.getId());

    return new ContactsModel(contactEntity, links);
  }

}
