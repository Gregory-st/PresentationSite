package com.example.presentationServer.responses;

import lombok.Getter;
import lombok.Setter;
import lombok.AccessLevel;

@Getter
public class ObjectResponse<T> extends BaseResponse {
  @Setter(AccessLevel.PRIVATE)
  private T entity;

  public ObjectResponse(BaseResponse baseResponse, T entity){
    super(
        baseResponse.getStatusCode(),
        baseResponse.getSuccess(),
        baseResponse.getMessage()
    );
    setEntity(entity);
  }
}
