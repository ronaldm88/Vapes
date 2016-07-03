module CheckInsHelper
  def display_check_in(check_in)
    link_to "#{check_in.rating}/10 - #{check_in.beer.name} by #{check_in.user.username}, #{time_ago_in_words(check_in.updated_at)} ago", check_in_path(check_in)
  end
end
