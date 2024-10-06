package patientappointment

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	ics "github.com/arran4/golang-ical"
	"github.com/jackc/pgx/v5/pgtype"
	"github.com/reyn-time/rc-categories/backend/db"
)

func CalendarHandler(Queries *db.Queries) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-type", "text/calendar")
		w.Header().Set("charset", "utf-8")
		w.Header().Set("Content-Disposition", "inline")

		// Check if the path is single-part only.
		parts := strings.Split(strings.TrimPrefix(r.URL.Path, "/"), "/")
		if len(parts) != 1 {
			http.Error(w, "Wrong number of path parts. Try /calendar/<hash>.ics", http.StatusBadRequest)
			return
		}

		// Check if path ends in .ics.
		filename := parts[0]
		if !strings.HasSuffix(filename, ".ics") {
			http.Error(w, "Path should end in .ics", http.StatusBadRequest)
			return
		}

		// Check if filename without .ics is valid UUID.
		uuid_s := strings.TrimSuffix(filename, ".ics")
		uuid := pgtype.UUID{}
		if err := uuid.Scan(uuid_s); err != nil || !uuid.Valid {
			http.Error(w, "UUID is not valid", http.StatusBadRequest)
			return
		}

		// Read all appointments relevant to the user.
		ctx := r.Context()
		dbAppointments, err := Queries.ListSignedUpPatientAppointmentForUser(ctx, uuid)
		if err != nil {
			http.Error(w, "Failed to retrieve database appointments", http.StatusInternalServerError)
		}

		cal := ics.NewCalendar()
		for _, dbAppointment := range dbAppointments {
			event := cal.AddEvent(strconv.Itoa(int(dbAppointment.ID)))
			event.SetStartAt(dbAppointment.StartTime.Time)
			event.SetEndAt(dbAppointment.StartTime.Time.Add(1 * time.Hour))

			patientName := dbAppointment.Initials
			if dbAppointment.Gender == db.ReorderGenderMale {
				patientName = "Mr " + patientName
			} else {
				patientName = "Ms " + patientName
			}
			event.SetSummary("Holly with " + patientName)
		}

		fmt.Fprint(w, cal.Serialize())
	})
}
