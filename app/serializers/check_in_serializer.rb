class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beer_id, :rating, :comment, :created_at
  has_one :user, serializer: CheckInUserSerializer
  has_one :beer, serializer: CheckInBeerSerializer
end
