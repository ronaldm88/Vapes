class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :beer_id, :rating, :comment, :created_at
end
