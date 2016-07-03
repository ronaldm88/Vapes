module BeersHelper
  def beer_error_messages(beer)
    # Unused code that I never got working
    if beer.errors.any?
      content_tag :h2, "We couldn't add the beer because it's missing some required info."

      beer.errors.full_messages.each do |message|
        content_tag :div, "#{message}<br>", class:"fields_with_errors"
      end
    end
  end
end
