// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        (unknown)
// source: proto/patientappointment/v1/patientappointment.proto

package patientappointmentv1

import (
	_ "github.com/reyn-time/rc-categories/backend/gen/proto/auth/v1"
	_ "github.com/reyn-time/rc-categories/backend/gen/proto/patient/v1"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ListCurrentPatientAppointmentRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ListCurrentPatientAppointmentRequest) Reset() {
	*x = ListCurrentPatientAppointmentRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListCurrentPatientAppointmentRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListCurrentPatientAppointmentRequest) ProtoMessage() {}

func (x *ListCurrentPatientAppointmentRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListCurrentPatientAppointmentRequest.ProtoReflect.Descriptor instead.
func (*ListCurrentPatientAppointmentRequest) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{0}
}

type ListCurrentPatientAppointmentResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Appointments []*PatientAppointment `protobuf:"bytes,1,rep,name=appointments,proto3" json:"appointments,omitempty"`
}

func (x *ListCurrentPatientAppointmentResponse) Reset() {
	*x = ListCurrentPatientAppointmentResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListCurrentPatientAppointmentResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListCurrentPatientAppointmentResponse) ProtoMessage() {}

func (x *ListCurrentPatientAppointmentResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListCurrentPatientAppointmentResponse.ProtoReflect.Descriptor instead.
func (*ListCurrentPatientAppointmentResponse) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{1}
}

func (x *ListCurrentPatientAppointmentResponse) GetAppointments() []*PatientAppointment {
	if x != nil {
		return x.Appointments
	}
	return nil
}

type CreatePatientAppointmentRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	StartTime *timestamppb.Timestamp `protobuf:"bytes,1,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	PatientId int32                  `protobuf:"varint,2,opt,name=patient_id,json=patientId,proto3" json:"patient_id,omitempty"`
}

func (x *CreatePatientAppointmentRequest) Reset() {
	*x = CreatePatientAppointmentRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreatePatientAppointmentRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreatePatientAppointmentRequest) ProtoMessage() {}

func (x *CreatePatientAppointmentRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreatePatientAppointmentRequest.ProtoReflect.Descriptor instead.
func (*CreatePatientAppointmentRequest) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{2}
}

func (x *CreatePatientAppointmentRequest) GetStartTime() *timestamppb.Timestamp {
	if x != nil {
		return x.StartTime
	}
	return nil
}

func (x *CreatePatientAppointmentRequest) GetPatientId() int32 {
	if x != nil {
		return x.PatientId
	}
	return 0
}

type CreatePatientAppointmentResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *CreatePatientAppointmentResponse) Reset() {
	*x = CreatePatientAppointmentResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreatePatientAppointmentResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreatePatientAppointmentResponse) ProtoMessage() {}

func (x *CreatePatientAppointmentResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreatePatientAppointmentResponse.ProtoReflect.Descriptor instead.
func (*CreatePatientAppointmentResponse) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{3}
}

type UpdatePatientAppointmentRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id        int32                  `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	StartTime *timestamppb.Timestamp `protobuf:"bytes,2,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
}

func (x *UpdatePatientAppointmentRequest) Reset() {
	*x = UpdatePatientAppointmentRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdatePatientAppointmentRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdatePatientAppointmentRequest) ProtoMessage() {}

func (x *UpdatePatientAppointmentRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdatePatientAppointmentRequest.ProtoReflect.Descriptor instead.
func (*UpdatePatientAppointmentRequest) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{4}
}

func (x *UpdatePatientAppointmentRequest) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *UpdatePatientAppointmentRequest) GetStartTime() *timestamppb.Timestamp {
	if x != nil {
		return x.StartTime
	}
	return nil
}

type UpdatePatientAppointmentResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *UpdatePatientAppointmentResponse) Reset() {
	*x = UpdatePatientAppointmentResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdatePatientAppointmentResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdatePatientAppointmentResponse) ProtoMessage() {}

func (x *UpdatePatientAppointmentResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdatePatientAppointmentResponse.ProtoReflect.Descriptor instead.
func (*UpdatePatientAppointmentResponse) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{5}
}

type DeletePatientAppointmentRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id int32 `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
}

func (x *DeletePatientAppointmentRequest) Reset() {
	*x = DeletePatientAppointmentRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeletePatientAppointmentRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeletePatientAppointmentRequest) ProtoMessage() {}

func (x *DeletePatientAppointmentRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeletePatientAppointmentRequest.ProtoReflect.Descriptor instead.
func (*DeletePatientAppointmentRequest) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{6}
}

func (x *DeletePatientAppointmentRequest) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

type DeletePatientAppointmentResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *DeletePatientAppointmentResponse) Reset() {
	*x = DeletePatientAppointmentResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *DeletePatientAppointmentResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*DeletePatientAppointmentResponse) ProtoMessage() {}

func (x *DeletePatientAppointmentResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use DeletePatientAppointmentResponse.ProtoReflect.Descriptor instead.
func (*DeletePatientAppointmentResponse) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{7}
}

type PatientAppointment struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id            int32                  `protobuf:"varint,3,opt,name=id,proto3" json:"id,omitempty"`
	StartTime     *timestamppb.Timestamp `protobuf:"bytes,1,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	MeetingNumber int32                  `protobuf:"varint,4,opt,name=meeting_number,json=meetingNumber,proto3" json:"meeting_number,omitempty"`
	PatientId     int32                  `protobuf:"varint,2,opt,name=patient_id,json=patientId,proto3" json:"patient_id,omitempty"`
}

func (x *PatientAppointment) Reset() {
	*x = PatientAppointment{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PatientAppointment) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PatientAppointment) ProtoMessage() {}

func (x *PatientAppointment) ProtoReflect() protoreflect.Message {
	mi := &file_proto_patientappointment_v1_patientappointment_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PatientAppointment.ProtoReflect.Descriptor instead.
func (*PatientAppointment) Descriptor() ([]byte, []int) {
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP(), []int{8}
}

func (x *PatientAppointment) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *PatientAppointment) GetStartTime() *timestamppb.Timestamp {
	if x != nil {
		return x.StartTime
	}
	return nil
}

func (x *PatientAppointment) GetMeetingNumber() int32 {
	if x != nil {
		return x.MeetingNumber
	}
	return 0
}

func (x *PatientAppointment) GetPatientId() int32 {
	if x != nil {
		return x.PatientId
	}
	return 0
}

var File_proto_patientappointment_v1_patientappointment_proto protoreflect.FileDescriptor

var file_proto_patientappointment_v1_patientappointment_proto_rawDesc = []byte{
	0x0a, 0x34, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61,
	0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x76, 0x31, 0x2f, 0x70, 0x61,
	0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x15, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61,
	0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x1a, 0x1f, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74,
	0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x2f, 0x76, 0x31,
	0x2f, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x18,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x61, 0x75, 0x74, 0x68, 0x2f, 0x76, 0x31, 0x2f, 0x61, 0x75,
	0x74, 0x68, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x26, 0x0a, 0x24, 0x4c, 0x69, 0x73, 0x74,
	0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x22, 0x76, 0x0a, 0x25, 0x4c, 0x69, 0x73, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x50,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x4d, 0x0a, 0x0c, 0x61, 0x70, 0x70,
	0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32,
	0x29, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41,
	0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x0c, 0x61, 0x70, 0x70, 0x6f,
	0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x73, 0x22, 0x7b, 0x0a, 0x1f, 0x43, 0x72, 0x65, 0x61,
	0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x73,
	0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x73, 0x74, 0x61,
	0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x1d, 0x0a, 0x0a, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e,
	0x74, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x09, 0x70, 0x61, 0x74, 0x69,
	0x65, 0x6e, 0x74, 0x49, 0x64, 0x22, 0x22, 0x0a, 0x20, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x6c, 0x0a, 0x1f, 0x55, 0x70, 0x64,
	0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e,
	0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x0e, 0x0a, 0x02,
	0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x02, 0x69, 0x64, 0x12, 0x39, 0x0a, 0x0a,
	0x73, 0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x73, 0x74,
	0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x22, 0x22, 0x0a, 0x20, 0x55, 0x70, 0x64, 0x61, 0x74,
	0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d,
	0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x31, 0x0a, 0x1f, 0x44,
	0x65, 0x6c, 0x65, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f,
	0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x0e,
	0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x02, 0x69, 0x64, 0x22, 0x22,
	0x0a, 0x20, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41,
	0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x22, 0xa5, 0x01, 0x0a, 0x12, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x02, 0x69, 0x64, 0x12, 0x39, 0x0a, 0x0a, 0x73, 0x74, 0x61,
	0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74,
	0x54, 0x69, 0x6d, 0x65, 0x12, 0x25, 0x0a, 0x0e, 0x6d, 0x65, 0x65, 0x74, 0x69, 0x6e, 0x67, 0x5f,
	0x6e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52, 0x0d, 0x6d, 0x65,
	0x65, 0x74, 0x69, 0x6e, 0x67, 0x4e, 0x75, 0x6d, 0x62, 0x65, 0x72, 0x12, 0x1d, 0x0a, 0x0a, 0x70,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52,
	0x09, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x49, 0x64, 0x32, 0xfa, 0x04, 0x0a, 0x19, 0x50,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0xa0, 0x01, 0x0a, 0x1d, 0x4c, 0x69, 0x73,
	0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41,
	0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x3b, 0x2e, 0x70, 0x61, 0x74,
	0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e,
	0x76, 0x31, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x50, 0x61,
	0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x3c, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e,
	0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x2e,
	0x4c, 0x69, 0x73, 0x74, 0x43, 0x75, 0x72, 0x72, 0x65, 0x6e, 0x74, 0x50, 0x61, 0x74, 0x69, 0x65,
	0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x04, 0x80, 0xb5, 0x18, 0x01, 0x12, 0x91, 0x01, 0x0a, 0x18,
	0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70,
	0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x36, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65,
	0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31,
	0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x37, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e,
	0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x50,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x04, 0x80, 0xb5, 0x18, 0x01, 0x12,
	0x91, 0x01, 0x0a, 0x18, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e,
	0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x36, 0x2e, 0x70,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65,
	0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x1a, 0x37, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x64,
	0x61, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e,
	0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x04, 0x80,
	0xb5, 0x18, 0x01, 0x12, 0x91, 0x01, 0x0a, 0x18, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x50, 0x61,
	0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74,
	0x12, 0x36, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e,
	0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31, 0x2e, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x50,
	0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e,
	0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x37, 0x2e, 0x70, 0x61, 0x74, 0x69, 0x65,
	0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x76, 0x31,
	0x2e, 0x44, 0x65, 0x6c, 0x65, 0x74, 0x65, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x41, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x04, 0x80, 0xb5, 0x18, 0x01, 0x42, 0x8a, 0x02, 0x0a, 0x19, 0x63, 0x6f, 0x6d, 0x2e,
	0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65,
	0x6e, 0x74, 0x2e, 0x76, 0x31, 0x42, 0x17, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01,
	0x5a, 0x5f, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x72, 0x65, 0x79,
	0x6e, 0x2d, 0x74, 0x69, 0x6d, 0x65, 0x2f, 0x72, 0x63, 0x2d, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f,
	0x72, 0x69, 0x65, 0x73, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x67, 0x65, 0x6e,
	0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x70, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2f, 0x76, 0x31, 0x3b, 0x70, 0x61, 0x74,
	0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x76,
	0x31, 0xa2, 0x02, 0x03, 0x50, 0x58, 0x58, 0xaa, 0x02, 0x15, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e,
	0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x2e, 0x56, 0x31, 0xca,
	0x02, 0x15, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74,
	0x6d, 0x65, 0x6e, 0x74, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x21, 0x50, 0x61, 0x74, 0x69, 0x65, 0x6e,
	0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74, 0x5c, 0x56, 0x31, 0x5c,
	0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x16, 0x50, 0x61,
	0x74, 0x69, 0x65, 0x6e, 0x74, 0x61, 0x70, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x6d, 0x65, 0x6e, 0x74,
	0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_patientappointment_v1_patientappointment_proto_rawDescOnce sync.Once
	file_proto_patientappointment_v1_patientappointment_proto_rawDescData = file_proto_patientappointment_v1_patientappointment_proto_rawDesc
)

func file_proto_patientappointment_v1_patientappointment_proto_rawDescGZIP() []byte {
	file_proto_patientappointment_v1_patientappointment_proto_rawDescOnce.Do(func() {
		file_proto_patientappointment_v1_patientappointment_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_patientappointment_v1_patientappointment_proto_rawDescData)
	})
	return file_proto_patientappointment_v1_patientappointment_proto_rawDescData
}

var file_proto_patientappointment_v1_patientappointment_proto_msgTypes = make([]protoimpl.MessageInfo, 9)
var file_proto_patientappointment_v1_patientappointment_proto_goTypes = []any{
	(*ListCurrentPatientAppointmentRequest)(nil),  // 0: patientappointment.v1.ListCurrentPatientAppointmentRequest
	(*ListCurrentPatientAppointmentResponse)(nil), // 1: patientappointment.v1.ListCurrentPatientAppointmentResponse
	(*CreatePatientAppointmentRequest)(nil),       // 2: patientappointment.v1.CreatePatientAppointmentRequest
	(*CreatePatientAppointmentResponse)(nil),      // 3: patientappointment.v1.CreatePatientAppointmentResponse
	(*UpdatePatientAppointmentRequest)(nil),       // 4: patientappointment.v1.UpdatePatientAppointmentRequest
	(*UpdatePatientAppointmentResponse)(nil),      // 5: patientappointment.v1.UpdatePatientAppointmentResponse
	(*DeletePatientAppointmentRequest)(nil),       // 6: patientappointment.v1.DeletePatientAppointmentRequest
	(*DeletePatientAppointmentResponse)(nil),      // 7: patientappointment.v1.DeletePatientAppointmentResponse
	(*PatientAppointment)(nil),                    // 8: patientappointment.v1.PatientAppointment
	(*timestamppb.Timestamp)(nil),                 // 9: google.protobuf.Timestamp
}
var file_proto_patientappointment_v1_patientappointment_proto_depIdxs = []int32{
	8, // 0: patientappointment.v1.ListCurrentPatientAppointmentResponse.appointments:type_name -> patientappointment.v1.PatientAppointment
	9, // 1: patientappointment.v1.CreatePatientAppointmentRequest.start_time:type_name -> google.protobuf.Timestamp
	9, // 2: patientappointment.v1.UpdatePatientAppointmentRequest.start_time:type_name -> google.protobuf.Timestamp
	9, // 3: patientappointment.v1.PatientAppointment.start_time:type_name -> google.protobuf.Timestamp
	0, // 4: patientappointment.v1.PatientAppointmentService.ListCurrentPatientAppointment:input_type -> patientappointment.v1.ListCurrentPatientAppointmentRequest
	2, // 5: patientappointment.v1.PatientAppointmentService.CreatePatientAppointment:input_type -> patientappointment.v1.CreatePatientAppointmentRequest
	4, // 6: patientappointment.v1.PatientAppointmentService.UpdatePatientAppointment:input_type -> patientappointment.v1.UpdatePatientAppointmentRequest
	6, // 7: patientappointment.v1.PatientAppointmentService.DeletePatientAppointment:input_type -> patientappointment.v1.DeletePatientAppointmentRequest
	1, // 8: patientappointment.v1.PatientAppointmentService.ListCurrentPatientAppointment:output_type -> patientappointment.v1.ListCurrentPatientAppointmentResponse
	3, // 9: patientappointment.v1.PatientAppointmentService.CreatePatientAppointment:output_type -> patientappointment.v1.CreatePatientAppointmentResponse
	5, // 10: patientappointment.v1.PatientAppointmentService.UpdatePatientAppointment:output_type -> patientappointment.v1.UpdatePatientAppointmentResponse
	7, // 11: patientappointment.v1.PatientAppointmentService.DeletePatientAppointment:output_type -> patientappointment.v1.DeletePatientAppointmentResponse
	8, // [8:12] is the sub-list for method output_type
	4, // [4:8] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_proto_patientappointment_v1_patientappointment_proto_init() }
func file_proto_patientappointment_v1_patientappointment_proto_init() {
	if File_proto_patientappointment_v1_patientappointment_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*ListCurrentPatientAppointmentRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*ListCurrentPatientAppointmentResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[2].Exporter = func(v any, i int) any {
			switch v := v.(*CreatePatientAppointmentRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[3].Exporter = func(v any, i int) any {
			switch v := v.(*CreatePatientAppointmentResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[4].Exporter = func(v any, i int) any {
			switch v := v.(*UpdatePatientAppointmentRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[5].Exporter = func(v any, i int) any {
			switch v := v.(*UpdatePatientAppointmentResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[6].Exporter = func(v any, i int) any {
			switch v := v.(*DeletePatientAppointmentRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[7].Exporter = func(v any, i int) any {
			switch v := v.(*DeletePatientAppointmentResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_patientappointment_v1_patientappointment_proto_msgTypes[8].Exporter = func(v any, i int) any {
			switch v := v.(*PatientAppointment); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_patientappointment_v1_patientappointment_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   9,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_patientappointment_v1_patientappointment_proto_goTypes,
		DependencyIndexes: file_proto_patientappointment_v1_patientappointment_proto_depIdxs,
		MessageInfos:      file_proto_patientappointment_v1_patientappointment_proto_msgTypes,
	}.Build()
	File_proto_patientappointment_v1_patientappointment_proto = out.File
	file_proto_patientappointment_v1_patientappointment_proto_rawDesc = nil
	file_proto_patientappointment_v1_patientappointment_proto_goTypes = nil
	file_proto_patientappointment_v1_patientappointment_proto_depIdxs = nil
}
