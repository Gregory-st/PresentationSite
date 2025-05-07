package com.example.presentationServer.responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse {
  private Integer statusCode;
  private Boolean success;
  private String message;
  public static BaseResponse getDefaultOk(String message) {
    return new BaseResponse(1, true, message);
  }
  public static BaseResponse getDefaultBad(String message) {
    return new BaseResponse(0, false, message);
  }
}
