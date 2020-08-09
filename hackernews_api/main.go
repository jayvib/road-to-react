package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func setupCors(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

type Data struct {
	Title       string `json:"title,omitempty"`
	URL         string `json:"url,omitempty"`
	Author      string `json:"author,omitempty"`
	NumComments int    `json:"num_comments,omitempty"`
	Points      int    `json:"points,omitempty"`
	ObjectID    int    `json:"objectID,omitempty"`
}

func main() {
	content, err := ioutil.ReadFile("data.json")
	if err != nil {
		log.Fatal(err)
	}

	data := make([]Data, 0)
	err = json.Unmarshal(content, &data)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(data)
	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {
		setupCors(w, r)
		if r.Method == "OPTIONS" {
			return
		}

		resp := struct {
			Hits []Data `json:"hits"`
		}{
			Hits: data,
		}
		err = json.NewEncoder(w).Encode(resp)
		if err != nil {
			log.Fatal(err)
		}
	})

	err = http.ListenAndServe(":8083", nil)
	if err != nil {
		log.Fatal(err)
	}

}
