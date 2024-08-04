// @generated by protoc-gen-es v1.10.0 with parameter "target=ts"
// @generated from file proto/patientappointment/v1/patientappointment.proto (package patientappointment.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, Timestamp, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message patientappointment.v1.ListCurrentPatientAppointmentRequest
 */
export class ListCurrentPatientAppointmentRequest extends Message<ListCurrentPatientAppointmentRequest> {
  constructor(data?: PartialMessage<ListCurrentPatientAppointmentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.ListCurrentPatientAppointmentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCurrentPatientAppointmentRequest {
    return new ListCurrentPatientAppointmentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCurrentPatientAppointmentRequest {
    return new ListCurrentPatientAppointmentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCurrentPatientAppointmentRequest {
    return new ListCurrentPatientAppointmentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: ListCurrentPatientAppointmentRequest | PlainMessage<ListCurrentPatientAppointmentRequest> | undefined, b: ListCurrentPatientAppointmentRequest | PlainMessage<ListCurrentPatientAppointmentRequest> | undefined): boolean {
    return proto3.util.equals(ListCurrentPatientAppointmentRequest, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.ListCurrentPatientAppointmentResponse
 */
export class ListCurrentPatientAppointmentResponse extends Message<ListCurrentPatientAppointmentResponse> {
  /**
   * @generated from field: repeated patientappointment.v1.PatientAppointment appointments = 1;
   */
  appointments: PatientAppointment[] = [];

  constructor(data?: PartialMessage<ListCurrentPatientAppointmentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.ListCurrentPatientAppointmentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "appointments", kind: "message", T: PatientAppointment, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ListCurrentPatientAppointmentResponse {
    return new ListCurrentPatientAppointmentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ListCurrentPatientAppointmentResponse {
    return new ListCurrentPatientAppointmentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ListCurrentPatientAppointmentResponse {
    return new ListCurrentPatientAppointmentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: ListCurrentPatientAppointmentResponse | PlainMessage<ListCurrentPatientAppointmentResponse> | undefined, b: ListCurrentPatientAppointmentResponse | PlainMessage<ListCurrentPatientAppointmentResponse> | undefined): boolean {
    return proto3.util.equals(ListCurrentPatientAppointmentResponse, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.CreatePatientAppointmentRequest
 */
export class CreatePatientAppointmentRequest extends Message<CreatePatientAppointmentRequest> {
  /**
   * @generated from field: google.protobuf.Timestamp start_time = 1;
   */
  startTime?: Timestamp;

  /**
   * @generated from field: int32 patient_id = 2;
   */
  patientId = 0;

  constructor(data?: PartialMessage<CreatePatientAppointmentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.CreatePatientAppointmentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "start_time", kind: "message", T: Timestamp },
    { no: 2, name: "patient_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePatientAppointmentRequest {
    return new CreatePatientAppointmentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePatientAppointmentRequest {
    return new CreatePatientAppointmentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePatientAppointmentRequest {
    return new CreatePatientAppointmentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: CreatePatientAppointmentRequest | PlainMessage<CreatePatientAppointmentRequest> | undefined, b: CreatePatientAppointmentRequest | PlainMessage<CreatePatientAppointmentRequest> | undefined): boolean {
    return proto3.util.equals(CreatePatientAppointmentRequest, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.CreatePatientAppointmentResponse
 */
export class CreatePatientAppointmentResponse extends Message<CreatePatientAppointmentResponse> {
  constructor(data?: PartialMessage<CreatePatientAppointmentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.CreatePatientAppointmentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CreatePatientAppointmentResponse {
    return new CreatePatientAppointmentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CreatePatientAppointmentResponse {
    return new CreatePatientAppointmentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CreatePatientAppointmentResponse {
    return new CreatePatientAppointmentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: CreatePatientAppointmentResponse | PlainMessage<CreatePatientAppointmentResponse> | undefined, b: CreatePatientAppointmentResponse | PlainMessage<CreatePatientAppointmentResponse> | undefined): boolean {
    return proto3.util.equals(CreatePatientAppointmentResponse, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.UpdatePatientAppointmentRequest
 */
export class UpdatePatientAppointmentRequest extends Message<UpdatePatientAppointmentRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  /**
   * @generated from field: google.protobuf.Timestamp start_time = 2;
   */
  startTime?: Timestamp;

  constructor(data?: PartialMessage<UpdatePatientAppointmentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.UpdatePatientAppointmentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "start_time", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdatePatientAppointmentRequest {
    return new UpdatePatientAppointmentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdatePatientAppointmentRequest {
    return new UpdatePatientAppointmentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdatePatientAppointmentRequest {
    return new UpdatePatientAppointmentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: UpdatePatientAppointmentRequest | PlainMessage<UpdatePatientAppointmentRequest> | undefined, b: UpdatePatientAppointmentRequest | PlainMessage<UpdatePatientAppointmentRequest> | undefined): boolean {
    return proto3.util.equals(UpdatePatientAppointmentRequest, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.UpdatePatientAppointmentResponse
 */
export class UpdatePatientAppointmentResponse extends Message<UpdatePatientAppointmentResponse> {
  constructor(data?: PartialMessage<UpdatePatientAppointmentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.UpdatePatientAppointmentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UpdatePatientAppointmentResponse {
    return new UpdatePatientAppointmentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UpdatePatientAppointmentResponse {
    return new UpdatePatientAppointmentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UpdatePatientAppointmentResponse {
    return new UpdatePatientAppointmentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: UpdatePatientAppointmentResponse | PlainMessage<UpdatePatientAppointmentResponse> | undefined, b: UpdatePatientAppointmentResponse | PlainMessage<UpdatePatientAppointmentResponse> | undefined): boolean {
    return proto3.util.equals(UpdatePatientAppointmentResponse, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.DeletePatientAppointmentRequest
 */
export class DeletePatientAppointmentRequest extends Message<DeletePatientAppointmentRequest> {
  /**
   * @generated from field: int32 id = 1;
   */
  id = 0;

  constructor(data?: PartialMessage<DeletePatientAppointmentRequest>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.DeletePatientAppointmentRequest";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePatientAppointmentRequest {
    return new DeletePatientAppointmentRequest().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePatientAppointmentRequest {
    return new DeletePatientAppointmentRequest().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePatientAppointmentRequest {
    return new DeletePatientAppointmentRequest().fromJsonString(jsonString, options);
  }

  static equals(a: DeletePatientAppointmentRequest | PlainMessage<DeletePatientAppointmentRequest> | undefined, b: DeletePatientAppointmentRequest | PlainMessage<DeletePatientAppointmentRequest> | undefined): boolean {
    return proto3.util.equals(DeletePatientAppointmentRequest, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.DeletePatientAppointmentResponse
 */
export class DeletePatientAppointmentResponse extends Message<DeletePatientAppointmentResponse> {
  constructor(data?: PartialMessage<DeletePatientAppointmentResponse>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.DeletePatientAppointmentResponse";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeletePatientAppointmentResponse {
    return new DeletePatientAppointmentResponse().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeletePatientAppointmentResponse {
    return new DeletePatientAppointmentResponse().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeletePatientAppointmentResponse {
    return new DeletePatientAppointmentResponse().fromJsonString(jsonString, options);
  }

  static equals(a: DeletePatientAppointmentResponse | PlainMessage<DeletePatientAppointmentResponse> | undefined, b: DeletePatientAppointmentResponse | PlainMessage<DeletePatientAppointmentResponse> | undefined): boolean {
    return proto3.util.equals(DeletePatientAppointmentResponse, a, b);
  }
}

/**
 * @generated from message patientappointment.v1.PatientAppointment
 */
export class PatientAppointment extends Message<PatientAppointment> {
  /**
   * @generated from field: int32 id = 3;
   */
  id = 0;

  /**
   * @generated from field: google.protobuf.Timestamp start_time = 1;
   */
  startTime?: Timestamp;

  /**
   * @generated from field: int32 meeting_number = 4;
   */
  meetingNumber = 0;

  /**
   * @generated from field: int32 patient_id = 2;
   */
  patientId = 0;

  constructor(data?: PartialMessage<PatientAppointment>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "patientappointment.v1.PatientAppointment";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 3, name: "id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 1, name: "start_time", kind: "message", T: Timestamp },
    { no: 4, name: "meeting_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "patient_id", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PatientAppointment {
    return new PatientAppointment().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PatientAppointment {
    return new PatientAppointment().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PatientAppointment {
    return new PatientAppointment().fromJsonString(jsonString, options);
  }

  static equals(a: PatientAppointment | PlainMessage<PatientAppointment> | undefined, b: PatientAppointment | PlainMessage<PatientAppointment> | undefined): boolean {
    return proto3.util.equals(PatientAppointment, a, b);
  }
}

