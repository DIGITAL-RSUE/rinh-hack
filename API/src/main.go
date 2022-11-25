package main

import (
	"io/ioutil"
	"net/http"
	"os"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	es, _ := elasticsearch.NewClient(elasticsearch.Config{
		Addresses: []string{
			"http://elasticsearch:9200",
		},
		Username: "elastic",
		Password: os.Getenv("ELASTIC_PASSWORD"),
	})

	r.POST("/api", func(ctx *gin.Context) {

		query, err := ioutil.ReadAll(ctx.Request.Body)
		query_string := string(query)

		res, err := es.Search(
			es.Search.WithIndex("logs"),
			es.Search.WithQuery(query_string),
		)

		body, err := ioutil.ReadAll(res.Body)

		if err != nil {
			ctx.JSON(http.StatusBadRequest, err.Error())
		} else {
			ctx.Data(http.StatusOK, "application/json", body)
		}
	})

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
