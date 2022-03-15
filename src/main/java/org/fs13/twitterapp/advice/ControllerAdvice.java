//package org.fs13.twitterapp.advice;
//
//import org.fs13.twitterapp.dto.rs.ExceptionResponse;
//import org.fs13.twitterapp.dto.rs.ValidationErrorResponse;
//import org.fs13.twitterapp.dto.rs.Violation;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.bind.annotation.ResponseStatus;
//
//import javax.validation.ConstraintViolationException;
//import java.util.*;
//import java.util.stream.Collectors;
//
//@org.springframework.web.bind.annotation.ControllerAdvice
//public class ControllerAdvice {
//    @ResponseBody
//    @ExceptionHandler(ConstraintViolationException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ValidationErrorResponse onConstraintViolationsException(ConstraintViolationException ex) {
//        final List<Violation> violations = ex.getConstraintViolations().stream()
//                .map(
//                        violation -> new Violation(
//                                violation.getPropertyPath().toString(),
//                                violation.getMessage()
//                        )
//                )
//                .collect(Collectors.toList());
//        return new ValidationErrorResponse(violations);
//    }
//
//
//
//    @ResponseBody
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ValidationErrorResponse onMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
//        final List<Violation> violations = ex.getBindingResult().getFieldErrors().stream()
//                .map(error -> new Violation(error.getField(), error.getDefaultMessage()))
//                .collect(Collectors.toList());
//        return new ValidationErrorResponse(violations);
//    }
//
//    @ResponseBody
//    @ExceptionHandler({Exception.class})
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    public ExceptionResponse onMethodArgumentNotValidException(Exception ex) {
//        return new ExceptionResponse(ex.getMessage());
//    }
//
//}