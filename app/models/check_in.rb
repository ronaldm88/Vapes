class CheckIn < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer

  validates :beer_id, presence: true
  validates :rating, presence: true, inclusion: 0..10

  def self.build_from_attributes(attributes)
    beer_attributes = attributes.delete("beer_attributes")

    if !!attributes[:beer_id]
      self.new do |check_in|
        check_in.beer = Beer.create(beer_attributes)
        check_in.rating = attributes[:rating]
        check_in.comment = attributes[:comment]
      end
    else
      binding.pry
    end
  end

  def self.beer_attributes_empty?(attributes)
    attributes.values.all? { |v| v.blank? }
  end
end
