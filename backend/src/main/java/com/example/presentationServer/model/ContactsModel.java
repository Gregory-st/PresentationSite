package com.example.presentationServer.model;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import lombok.AccessLevel;
import com.example.presentationServer.entites.ContactEntity;
import com.example.presentationServer.entites.LinksContactEntity;

@Getter
@Setter
public class ContactsModel {
  @Setter(AccessLevel.PRIVATE)
  private String[][] urls;
  private String name;
  private String firstname;
  private String email;
  private String phone;

  public ContactsModel(ContactEntity contactEntity, List<LinksContactEntity> linksContactEntity) {
    setName(contactEntity.getName());
    setEmail(contactEntity.getEmail());
    setPhone(contactEntity.getPhone());
    setFirstname(contactEntity.getFirstname());

    urls = new String[2][linksContactEntity.size()];
    for (int i = 0; i < linksContactEntity.size(); i++) {
      urls[0][i] = linksContactEntity.get(i).getName();
      urls[1][i] = linksContactEntity.get(i).getUrl();
    }
  }
}
