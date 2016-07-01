module BeersHelper

  def display_beers(beers)
    if beers.nil?
      link_to "Add Beer", new_beer_path, class:"btn btn-success"
    else
      beers.each do |beer|
        link_to beer.name, beer_path(beer)
      end
    end
  end
end
