class CheckIn < ActiveRecord::Base
  belongs_to :user
  belongs_to :beer

  validates :rating, presence: true, inclusion: 0..10
end
