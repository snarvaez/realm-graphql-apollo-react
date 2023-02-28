exports = async function(MovieQueryInput){
  
  console.log(JSON.stringify(MovieQueryInput));

  var movies = context.services.get("mongodb-atlas").db("sample_mflix").collection("movies");
  
  var searchText = MovieQueryInput.title; 

  var pipeline = [
    {
     $search: {
      text: {
       query: searchText,
       path: ['title','plot','fullplot'],
       fuzzy: {
        maxEdits: 1,
        prefixLength: 1,
        maxExpansions: 256
       }
      }
     }
    }, 
    { 
      $limit: 1 
    }
  ];

  return await movies.aggregate(pipeline).toArray()
  .then(data => {
    console.log(data.length);
    return data.length == 1? data[0] : null; 
  })
  .catch(err => {
    console.log(err.toString());
    return err.toString();
  });

};