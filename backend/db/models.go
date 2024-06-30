// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.26.0

package db

import (
	"database/sql/driver"
	"fmt"

	"github.com/jackc/pgx/v5/pgtype"
)

type ReorderVideoStatus string

const (
	ReorderVideoStatusApproved   ReorderVideoStatus = "approved"
	ReorderVideoStatusArchived   ReorderVideoStatus = "archived"
	ReorderVideoStatusPending    ReorderVideoStatus = "pending"
	ReorderVideoStatusInProgress ReorderVideoStatus = "in_progress"
	ReorderVideoStatusInReview   ReorderVideoStatus = "in_review"
)

func (e *ReorderVideoStatus) Scan(src interface{}) error {
	switch s := src.(type) {
	case []byte:
		*e = ReorderVideoStatus(s)
	case string:
		*e = ReorderVideoStatus(s)
	default:
		return fmt.Errorf("unsupported scan type for ReorderVideoStatus: %T", src)
	}
	return nil
}

type NullReorderVideoStatus struct {
	ReorderVideoStatus ReorderVideoStatus
	Valid              bool // Valid is true if ReorderVideoStatus is not NULL
}

// Scan implements the Scanner interface.
func (ns *NullReorderVideoStatus) Scan(value interface{}) error {
	if value == nil {
		ns.ReorderVideoStatus, ns.Valid = "", false
		return nil
	}
	ns.Valid = true
	return ns.ReorderVideoStatus.Scan(value)
}

// Value implements the driver Valuer interface.
func (ns NullReorderVideoStatus) Value() (driver.Value, error) {
	if !ns.Valid {
		return nil, nil
	}
	return string(ns.ReorderVideoStatus), nil
}

type ReorderCategory struct {
	ID          int32
	Name        string
	Description pgtype.Text
	ParentID    pgtype.Int4
	Rank        int32
}

type ReorderUser struct {
	ID       int32
	Email    string
	Name     pgtype.Text
	PhotoUrl pgtype.Text
}

type ReorderVideo struct {
	ID        int32
	Name      string
	YoutubeID string
	CreatedAt pgtype.Timestamp
	Status    ReorderVideoStatus
}

type ReorderVideoInterval struct {
	ID          int32
	VideoID     int32
	StartTime   float32
	EndTime     float32
	Description pgtype.Text
}

type ReorderVideoIntervalCategory struct {
	ID              int32
	VideoIntervalID int32
	CategoryID      int32
}
