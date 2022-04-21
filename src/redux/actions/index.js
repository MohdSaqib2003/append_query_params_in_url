import axios from "axios";

export const fetchData = (pageNum) => async dispatch => {
    console.log('click top',pageNum);
    // "size": 4

    var data = JSON.stringify({
        "from": pageNum,
        "size": 4,
        "query": {
            "bool": {
                "must": [
                    {
                        "terms": {
                            "featured": [
                                false
                            ]
                        }
                    },
                    {
                        "terms": {
                            "is_meet": [
                                true
                            ]
                        }
                    },
                    {
                        "terms": {
                            "status": [
                                true
                            ]
                        }
                    }
                ],
                "should": []
            }
        },
        "sort": []
    });

    var config = {
        method: 'post',
        url: 'https://search-leevcb-stage-auth2-fdj7ppke56eytwdkn7l5ahyw3m.us-east-1.es.amazonaws.com/elasticsearch_index_stage_leevcb_business/_search',
        headers: {
            'accept': 'application/json',
            'authorization': 'Basic bGVldmNiLXN0YWdlOjg0ckFLQTF0MTUjSm4xUUYyVTFnSnJkNjJo',
            'content-type': 'application/json',
        },
        data: data
    };


    const response = await axios(config);
    // console.log(response.data.hits.hits);
    dispatch ({ type: 'FETCH_DATA', payload: response.data.hits.hits })
}
