class CheckIn < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer

  validates :beer_id, presence: true
  validates :rating, presence: true, inclusion: 0..10

  def self.build_from_attributes(attributes)
    beer_attributes = attributes.delete("beer_attributes")

    if !attributes[:beer_id].empty?
      self.new do |check_in|
        check_in.beer = Beer.find(attributes[:beer_id])
        check_in.rating = attributes[:rating]
        check_in.comment = attributes[:comment]
      end
    else
      self.new do |check_in|
        check_in.beer = Beer.create(beer_attributes)
        check_in.rating = attributes[:rating]
        check_in.comment = attributes[:comment]
      end
    end
  end

  def self.beer_attributes_empty?(attributes)
    attributes.values.all? { |v| v.blank? }
  end
end
