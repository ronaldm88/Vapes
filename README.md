# beer-me

## What is this?

This is an application built using Ruby on Rails which allows a user to keep track of the beers they like or don't like. It's basically an Untappd clone that's only on the web.  

A user can sign up through the site or facebook, add beers, add check ins of beer, view other beers and check ins. All beers, check ins , and users are visible to anyone that has logged in.


## To Install
```ruby
  # Move to your code directory, I am using a default in the example
  # but you can use any  directory.
  cd ~/Development/code

  # Clone the project code
  git clone git@github.com:zacscodingclub/beer-me.git

  # Move into the new directory we just cloned
  cd beer-me

  # Install the necessary gems
  bundle install

  # Seed with some sample data
  rake db:seed

  # Startup the server
  rails s

  # Visit the webpage in your browser at localhost:3000
```

## To-Do
* Build out tests (oops TDD)
* Go beyond basic Bootstrap site
* Add attributes to check ins (photo, likes) and beer (label, abv)
* Extract Brewery to it's own class and wire up associations
