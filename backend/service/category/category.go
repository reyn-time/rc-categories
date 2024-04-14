package category

import (
	"context"

	"connectrpc.com/connect"
	"github.com/reyn-time/rc-categories/backend/db"
	categorypb "github.com/reyn-time/rc-categories/backend/gen/proto/category/v1"
)

type CategoryService struct {
	Queries *db.Queries
}

func (s *CategoryService) ListCategory(ctx context.Context, req *connect.Request[categorypb.ListCategoryRequest]) (*connect.Response[categorypb.ListCategoryResponse], error) {
	categoriesDB, err := s.Queries.ListCategories(ctx)

	if err != nil {
		return nil, err
	}

	categories := make([]*categorypb.Category, len(categoriesDB))
	for i, c := range categoriesDB {
		categories[i] = &categorypb.Category{
			Id:          c.ID,
			Name:        c.Name,
			Description: c.Description.String,
			Rank:        c.Rank,
			ParentId:    c.ParentID.Int32,
		}
	}

	res := connect.NewResponse(&categorypb.ListCategoryResponse{
		Categories: categories,
	})
	return res, nil
}
