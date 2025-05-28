package com.example.presentationServer.responses;

import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Getter
public class ListResponse<T> extends BaseResponse {
  @Setter(AccessLevel.PRIVATE)
  private List<T> objects;

  public ListResponse(BaseResponse baseResponse, List<T> objects) {
    super(
        baseResponse.getStatusCode(),
        baseResponse.getSuccess(),
        baseResponse.getMessage()
    );

    setObjects(objects);
  }

  public ListResponse(BaseResponse baseResponse){
    super(
        baseResponse.getStatusCode(),
        baseResponse.getSuccess(),
        baseResponse.getMessage()
    );
  }
}
