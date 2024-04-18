// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.31.0
// 	protoc        (unknown)
// source: proto/interval/v1/interval.proto

package intervalv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type PostIntervalRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Interval *Interval `protobuf:"bytes,1,opt,name=interval,proto3" json:"interval,omitempty"`
}

func (x *PostIntervalRequest) Reset() {
	*x = PostIntervalRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PostIntervalRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PostIntervalRequest) ProtoMessage() {}

func (x *PostIntervalRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PostIntervalRequest.ProtoReflect.Descriptor instead.
func (*PostIntervalRequest) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{0}
}

func (x *PostIntervalRequest) GetInterval() *Interval {
	if x != nil {
		return x.Interval
	}
	return nil
}

type PostIntervalResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *PostIntervalResponse) Reset() {
	*x = PostIntervalResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *PostIntervalResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*PostIntervalResponse) ProtoMessage() {}

func (x *PostIntervalResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use PostIntervalResponse.ProtoReflect.Descriptor instead.
func (*PostIntervalResponse) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{1}
}

type ListIntervalRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	VideoId int32 `protobuf:"varint,1,opt,name=video_id,json=videoId,proto3" json:"video_id,omitempty"`
}

func (x *ListIntervalRequest) Reset() {
	*x = ListIntervalRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListIntervalRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListIntervalRequest) ProtoMessage() {}

func (x *ListIntervalRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListIntervalRequest.ProtoReflect.Descriptor instead.
func (*ListIntervalRequest) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{2}
}

func (x *ListIntervalRequest) GetVideoId() int32 {
	if x != nil {
		return x.VideoId
	}
	return 0
}

type ListIntervalResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Intervals []*Interval `protobuf:"bytes,1,rep,name=intervals,proto3" json:"intervals,omitempty"`
}

func (x *ListIntervalResponse) Reset() {
	*x = ListIntervalResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListIntervalResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListIntervalResponse) ProtoMessage() {}

func (x *ListIntervalResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListIntervalResponse.ProtoReflect.Descriptor instead.
func (*ListIntervalResponse) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{3}
}

func (x *ListIntervalResponse) GetIntervals() []*Interval {
	if x != nil {
		return x.Intervals
	}
	return nil
}

type UpdateIntervalRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Interval *Interval `protobuf:"bytes,1,opt,name=interval,proto3" json:"interval,omitempty"`
}

func (x *UpdateIntervalRequest) Reset() {
	*x = UpdateIntervalRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateIntervalRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateIntervalRequest) ProtoMessage() {}

func (x *UpdateIntervalRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateIntervalRequest.ProtoReflect.Descriptor instead.
func (*UpdateIntervalRequest) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{4}
}

func (x *UpdateIntervalRequest) GetInterval() *Interval {
	if x != nil {
		return x.Interval
	}
	return nil
}

type UpdateIntervalResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *UpdateIntervalResponse) Reset() {
	*x = UpdateIntervalResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UpdateIntervalResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UpdateIntervalResponse) ProtoMessage() {}

func (x *UpdateIntervalResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UpdateIntervalResponse.ProtoReflect.Descriptor instead.
func (*UpdateIntervalResponse) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{5}
}

type Interval struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id          int32   `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	VideoId     int32   `protobuf:"varint,2,opt,name=video_id,json=videoId,proto3" json:"video_id,omitempty"`
	StartTime   int32   `protobuf:"varint,3,opt,name=start_time,json=startTime,proto3" json:"start_time,omitempty"`
	EndTime     int32   `protobuf:"varint,4,opt,name=end_time,json=endTime,proto3" json:"end_time,omitempty"`
	Description string  `protobuf:"bytes,5,opt,name=description,proto3" json:"description,omitempty"`
	CategoryIds []int32 `protobuf:"varint,6,rep,packed,name=category_ids,json=categoryIds,proto3" json:"category_ids,omitempty"`
}

func (x *Interval) Reset() {
	*x = Interval{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_interval_v1_interval_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Interval) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Interval) ProtoMessage() {}

func (x *Interval) ProtoReflect() protoreflect.Message {
	mi := &file_proto_interval_v1_interval_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Interval.ProtoReflect.Descriptor instead.
func (*Interval) Descriptor() ([]byte, []int) {
	return file_proto_interval_v1_interval_proto_rawDescGZIP(), []int{6}
}

func (x *Interval) GetId() int32 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Interval) GetVideoId() int32 {
	if x != nil {
		return x.VideoId
	}
	return 0
}

func (x *Interval) GetStartTime() int32 {
	if x != nil {
		return x.StartTime
	}
	return 0
}

func (x *Interval) GetEndTime() int32 {
	if x != nil {
		return x.EndTime
	}
	return 0
}

func (x *Interval) GetDescription() string {
	if x != nil {
		return x.Description
	}
	return ""
}

func (x *Interval) GetCategoryIds() []int32 {
	if x != nil {
		return x.CategoryIds
	}
	return nil
}

var File_proto_interval_v1_interval_proto protoreflect.FileDescriptor

var file_proto_interval_v1_interval_proto_rawDesc = []byte{
	0x0a, 0x20, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c,
	0x2f, 0x76, 0x31, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x0b, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x22,
	0x48, 0x0a, 0x13, 0x50, 0x6f, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x31, 0x0a, 0x08, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76,
	0x61, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72,
	0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52,
	0x08, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x22, 0x16, 0x0a, 0x14, 0x50, 0x6f, 0x73,
	0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73,
	0x65, 0x22, 0x30, 0x0a, 0x13, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61,
	0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x19, 0x0a, 0x08, 0x76, 0x69, 0x64, 0x65,
	0x6f, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x07, 0x76, 0x69, 0x64, 0x65,
	0x6f, 0x49, 0x64, 0x22, 0x4b, 0x0a, 0x14, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72,
	0x76, 0x61, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x33, 0x0a, 0x09, 0x69,
	0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x15,
	0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x49, 0x6e, 0x74,
	0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x09, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x73,
	0x22, 0x4a, 0x0a, 0x15, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76,
	0x61, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x31, 0x0a, 0x08, 0x69, 0x6e, 0x74,
	0x65, 0x72, 0x76, 0x61, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x15, 0x2e, 0x69, 0x6e,
	0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76,
	0x61, 0x6c, 0x52, 0x08, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x22, 0x18, 0x0a, 0x16,
	0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0xb4, 0x01, 0x0a, 0x08, 0x49, 0x6e, 0x74, 0x65, 0x72,
	0x76, 0x61, 0x6c, 0x12, 0x0e, 0x0a, 0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52,
	0x02, 0x69, 0x64, 0x12, 0x19, 0x0a, 0x08, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x5f, 0x69, 0x64, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x07, 0x76, 0x69, 0x64, 0x65, 0x6f, 0x49, 0x64, 0x12, 0x1d,
	0x0a, 0x0a, 0x73, 0x74, 0x61, 0x72, 0x74, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x03, 0x20, 0x01,
	0x28, 0x05, 0x52, 0x09, 0x73, 0x74, 0x61, 0x72, 0x74, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x19, 0x0a,
	0x08, 0x65, 0x6e, 0x64, 0x5f, 0x74, 0x69, 0x6d, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x05, 0x52,
	0x07, 0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x12, 0x20, 0x0a, 0x0b, 0x64, 0x65, 0x73, 0x63,
	0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64,
	0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x21, 0x0a, 0x0c, 0x63, 0x61,
	0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x5f, 0x69, 0x64, 0x73, 0x18, 0x06, 0x20, 0x03, 0x28, 0x05,
	0x52, 0x0b, 0x63, 0x61, 0x74, 0x65, 0x67, 0x6f, 0x72, 0x79, 0x49, 0x64, 0x73, 0x32, 0x9c, 0x02,
	0x0a, 0x0f, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63,
	0x65, 0x12, 0x55, 0x0a, 0x0c, 0x50, 0x6f, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61,
	0x6c, 0x12, 0x20, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e,
	0x50, 0x6f, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65, 0x71, 0x75,
	0x65, 0x73, 0x74, 0x1a, 0x21, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76,
	0x31, 0x2e, 0x50, 0x6f, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x55, 0x0a, 0x0c, 0x4c, 0x69, 0x73, 0x74,
	0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x12, 0x20, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72,
	0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x74, 0x65, 0x72,
	0x76, 0x61, 0x6c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x21, 0x2e, 0x69, 0x6e, 0x74,
	0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x49, 0x6e, 0x74,
	0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12,
	0x5b, 0x0a, 0x0e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61,
	0x6c, 0x12, 0x22, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31, 0x2e,
	0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x23, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c,
	0x2e, 0x76, 0x31, 0x2e, 0x55, 0x70, 0x64, 0x61, 0x74, 0x65, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76,
	0x61, 0x6c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0xba, 0x01, 0x0a,
	0x0f, 0x63, 0x6f, 0x6d, 0x2e, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e, 0x76, 0x31,
	0x42, 0x0d, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50,
	0x01, 0x5a, 0x4b, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x72, 0x65,
	0x79, 0x6e, 0x2d, 0x74, 0x69, 0x6d, 0x65, 0x2f, 0x72, 0x63, 0x2d, 0x63, 0x61, 0x74, 0x65, 0x67,
	0x6f, 0x72, 0x69, 0x65, 0x73, 0x2f, 0x62, 0x61, 0x63, 0x6b, 0x65, 0x6e, 0x64, 0x2f, 0x67, 0x65,
	0x6e, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c,
	0x2f, 0x76, 0x31, 0x3b, 0x69, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x76, 0x31, 0xa2, 0x02,
	0x03, 0x49, 0x58, 0x58, 0xaa, 0x02, 0x0b, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x2e,
	0x56, 0x31, 0xca, 0x02, 0x0b, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x5c, 0x56, 0x31,
	0xe2, 0x02, 0x17, 0x49, 0x6e, 0x74, 0x65, 0x72, 0x76, 0x61, 0x6c, 0x5c, 0x56, 0x31, 0x5c, 0x47,
	0x50, 0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x0c, 0x49, 0x6e, 0x74,
	0x65, 0x72, 0x76, 0x61, 0x6c, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x33,
}

var (
	file_proto_interval_v1_interval_proto_rawDescOnce sync.Once
	file_proto_interval_v1_interval_proto_rawDescData = file_proto_interval_v1_interval_proto_rawDesc
)

func file_proto_interval_v1_interval_proto_rawDescGZIP() []byte {
	file_proto_interval_v1_interval_proto_rawDescOnce.Do(func() {
		file_proto_interval_v1_interval_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_interval_v1_interval_proto_rawDescData)
	})
	return file_proto_interval_v1_interval_proto_rawDescData
}

var file_proto_interval_v1_interval_proto_msgTypes = make([]protoimpl.MessageInfo, 7)
var file_proto_interval_v1_interval_proto_goTypes = []interface{}{
	(*PostIntervalRequest)(nil),    // 0: interval.v1.PostIntervalRequest
	(*PostIntervalResponse)(nil),   // 1: interval.v1.PostIntervalResponse
	(*ListIntervalRequest)(nil),    // 2: interval.v1.ListIntervalRequest
	(*ListIntervalResponse)(nil),   // 3: interval.v1.ListIntervalResponse
	(*UpdateIntervalRequest)(nil),  // 4: interval.v1.UpdateIntervalRequest
	(*UpdateIntervalResponse)(nil), // 5: interval.v1.UpdateIntervalResponse
	(*Interval)(nil),               // 6: interval.v1.Interval
}
var file_proto_interval_v1_interval_proto_depIdxs = []int32{
	6, // 0: interval.v1.PostIntervalRequest.interval:type_name -> interval.v1.Interval
	6, // 1: interval.v1.ListIntervalResponse.intervals:type_name -> interval.v1.Interval
	6, // 2: interval.v1.UpdateIntervalRequest.interval:type_name -> interval.v1.Interval
	0, // 3: interval.v1.IntervalService.PostInterval:input_type -> interval.v1.PostIntervalRequest
	2, // 4: interval.v1.IntervalService.ListInterval:input_type -> interval.v1.ListIntervalRequest
	4, // 5: interval.v1.IntervalService.UpdateInterval:input_type -> interval.v1.UpdateIntervalRequest
	1, // 6: interval.v1.IntervalService.PostInterval:output_type -> interval.v1.PostIntervalResponse
	3, // 7: interval.v1.IntervalService.ListInterval:output_type -> interval.v1.ListIntervalResponse
	5, // 8: interval.v1.IntervalService.UpdateInterval:output_type -> interval.v1.UpdateIntervalResponse
	6, // [6:9] is the sub-list for method output_type
	3, // [3:6] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_proto_interval_v1_interval_proto_init() }
func file_proto_interval_v1_interval_proto_init() {
	if File_proto_interval_v1_interval_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_interval_v1_interval_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PostIntervalRequest); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*PostIntervalResponse); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListIntervalRequest); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ListIntervalResponse); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateIntervalRequest); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UpdateIntervalResponse); i {
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
		file_proto_interval_v1_interval_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Interval); i {
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
			RawDescriptor: file_proto_interval_v1_interval_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   7,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_interval_v1_interval_proto_goTypes,
		DependencyIndexes: file_proto_interval_v1_interval_proto_depIdxs,
		MessageInfos:      file_proto_interval_v1_interval_proto_msgTypes,
	}.Build()
	File_proto_interval_v1_interval_proto = out.File
	file_proto_interval_v1_interval_proto_rawDesc = nil
	file_proto_interval_v1_interval_proto_goTypes = nil
	file_proto_interval_v1_interval_proto_depIdxs = nil
}
