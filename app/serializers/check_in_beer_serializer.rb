class CheckInBeerSerializer < ActiveModel::Serializer
  attributes :id, :name, :style, :brewery
end
