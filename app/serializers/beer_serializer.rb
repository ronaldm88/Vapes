class BeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :style, :brewery
end
