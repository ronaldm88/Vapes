class CheckIn < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer

  validates :beer_id, presence: true
  validates :rating, presence: true, inclusion: 0..10

  def self.build_from_attributes(attributes)
    beer_attributes = attributes.delete("beer_attributes")

    if beer_attributes_empty?(beer_attributes)
      self.new(attributes)
    else
      beer = Beer.create(beer_attributes)
      self.new(attributes)
    end
  end

  def self.beer_attributes_empty?(attributes)
    attributes.values.all? { |v| v.blank? }
  end
end
