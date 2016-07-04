module ApplicationHelper
  def display_check_in(check_in)
    link_to "#{check_in.rating}/10 - #{check_in.beer.name} by #{check_in.user.username}, #{time_ago_in_words(check_in.updated_at)} ago", user_check_in_path(check_in.user, check_in)
  end

  def display_favorites(favorites)
    favorites.each do |favorite|
      link_to favorite.beer.name, beer_path(favorite.beer)
    end
  end

end
