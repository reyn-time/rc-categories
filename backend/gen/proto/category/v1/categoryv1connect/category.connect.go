// Code generated by protoc-gen-connect-go. DO NOT EDIT.
//
// Source: proto/category/v1/category.proto

package categoryv1connect

import (
	connect "connectrpc.com/connect"
	context "context"
	errors "errors"
	v1 "github.com/reyn-time/rc-categories/backend/gen/proto/category/v1"
	http "net/http"
	strings "strings"
)

// This is a compile-time assertion to ensure that this generated file and the connect package are
// compatible. If you get a compiler error that this constant is not defined, this code was
// generated with a version of connect newer than the one compiled into your binary. You can fix the
// problem by either regenerating this code with an older version of connect or updating the connect
// version compiled into your binary.
const _ = connect.IsAtLeastVersion1_13_0

const (
	// CategoryServiceName is the fully-qualified name of the CategoryService service.
	CategoryServiceName = "category.v1.CategoryService"
)

// These constants are the fully-qualified names of the RPCs defined in this package. They're
// exposed at runtime as Spec.Procedure and as the final two segments of the HTTP route.
//
// Note that these are different from the fully-qualified method names used by
// google.golang.org/protobuf/reflect/protoreflect. To convert from these constants to
// reflection-formatted method names, remove the leading slash and convert the remaining slash to a
// period.
const (
	// CategoryServiceListCategoryProcedure is the fully-qualified name of the CategoryService's
	// ListCategory RPC.
	CategoryServiceListCategoryProcedure = "/category.v1.CategoryService/ListCategory"
)

// These variables are the protoreflect.Descriptor objects for the RPCs defined in this package.
var (
	categoryServiceServiceDescriptor            = v1.File_proto_category_v1_category_proto.Services().ByName("CategoryService")
	categoryServiceListCategoryMethodDescriptor = categoryServiceServiceDescriptor.Methods().ByName("ListCategory")
)

// CategoryServiceClient is a client for the category.v1.CategoryService service.
type CategoryServiceClient interface {
	ListCategory(context.Context, *connect.Request[v1.ListCategoryRequest]) (*connect.Response[v1.ListCategoryResponse], error)
}

// NewCategoryServiceClient constructs a client for the category.v1.CategoryService service. By
// default, it uses the Connect protocol with the binary Protobuf Codec, asks for gzipped responses,
// and sends uncompressed requests. To use the gRPC or gRPC-Web protocols, supply the
// connect.WithGRPC() or connect.WithGRPCWeb() options.
//
// The URL supplied here should be the base URL for the Connect or gRPC server (for example,
// http://api.acme.com or https://acme.com/grpc).
func NewCategoryServiceClient(httpClient connect.HTTPClient, baseURL string, opts ...connect.ClientOption) CategoryServiceClient {
	baseURL = strings.TrimRight(baseURL, "/")
	return &categoryServiceClient{
		listCategory: connect.NewClient[v1.ListCategoryRequest, v1.ListCategoryResponse](
			httpClient,
			baseURL+CategoryServiceListCategoryProcedure,
			connect.WithSchema(categoryServiceListCategoryMethodDescriptor),
			connect.WithClientOptions(opts...),
		),
	}
}

// categoryServiceClient implements CategoryServiceClient.
type categoryServiceClient struct {
	listCategory *connect.Client[v1.ListCategoryRequest, v1.ListCategoryResponse]
}

// ListCategory calls category.v1.CategoryService.ListCategory.
func (c *categoryServiceClient) ListCategory(ctx context.Context, req *connect.Request[v1.ListCategoryRequest]) (*connect.Response[v1.ListCategoryResponse], error) {
	return c.listCategory.CallUnary(ctx, req)
}

// CategoryServiceHandler is an implementation of the category.v1.CategoryService service.
type CategoryServiceHandler interface {
	ListCategory(context.Context, *connect.Request[v1.ListCategoryRequest]) (*connect.Response[v1.ListCategoryResponse], error)
}

// NewCategoryServiceHandler builds an HTTP handler from the service implementation. It returns the
// path on which to mount the handler and the handler itself.
//
// By default, handlers support the Connect, gRPC, and gRPC-Web protocols with the binary Protobuf
// and JSON codecs. They also support gzip compression.
func NewCategoryServiceHandler(svc CategoryServiceHandler, opts ...connect.HandlerOption) (string, http.Handler) {
	categoryServiceListCategoryHandler := connect.NewUnaryHandler(
		CategoryServiceListCategoryProcedure,
		svc.ListCategory,
		connect.WithSchema(categoryServiceListCategoryMethodDescriptor),
		connect.WithHandlerOptions(opts...),
	)
	return "/category.v1.CategoryService/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		switch r.URL.Path {
		case CategoryServiceListCategoryProcedure:
			categoryServiceListCategoryHandler.ServeHTTP(w, r)
		default:
			http.NotFound(w, r)
		}
	})
}

// UnimplementedCategoryServiceHandler returns CodeUnimplemented from all methods.
type UnimplementedCategoryServiceHandler struct{}

func (UnimplementedCategoryServiceHandler) ListCategory(context.Context, *connect.Request[v1.ListCategoryRequest]) (*connect.Response[v1.ListCategoryResponse], error) {
	return nil, connect.NewError(connect.CodeUnimplemented, errors.New("category.v1.CategoryService.ListCategory is not implemented"))
}