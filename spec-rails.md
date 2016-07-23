
# Rails App requirements:

~~1. RoR~~


~~2. has_many, belongs_to, and has_many , through: relationships~~

    User has_many CheckIns
    Beer belong_to CheckIn
    User has_many Beers, through: CheckIns
    Beer has_many Users, through: CheckIns
    CheckIn belongs_to User, Beer


~~3. Join model must contain an attribute in addition to the respective IDs~~
    CheckIn#comment and #rating


~~4. Model validations~~

    User: username, email, location, photo
    Beer: name, brewery, style
    CheckIn: user, beer, rating, comment


~~5. At least 1 ActiveRecord scope method (think max, min, count, etc.  )~~
    User#favorite_beer
    Beer.most_recent(n)


~~6. Nested form that writes to associated model through custom attribute writer.~~
      Add new beer on new CheckIn page


~~7. User Authentication~~
    Devise


~~8. Authenticate with some other service (facebook, twitter, foursquare, github, etc.)~~
    omniauth-facebook


~~9. Nested Resource with appropriate RESTful URLs.  Additionally, your nested resource
   must provide a form that relates to the parent resource. Imagine an application with
   user profiles. You might represent a person's profile via the RESTful URL of /profiles/1,
   where 1 is the primary key of the profile. If the person wanted to add pictures to
   their profile, you could represent that as a nested resource of /profiles/1/pictures,
   listing all pictures belonging to profile 1. The route /profiles/1/pictures/new would
   allow to me upload a new picture to profile 1.~~

   /users/:id/check_ins/:id


 ~~10. Forms need validation errors.  Fields enclosed with a fields_with_errors class.~~


 ~~11. Mostly DRY~~
     Encapsulate controller logic to Model methods
      -Controller logic only 1 level deep
     Views use helper methods to deal with logic
      -Several ApplicationHelpers and one BeersHelper
