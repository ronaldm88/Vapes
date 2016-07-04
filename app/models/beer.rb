class Beer < ActiveRecord::Base
  has_many :check_ins
  has_many :users, through: :check_ins

  validates :name, presence: true, uniqueness: true
  validates :brewery, presence: true
  validates :style, presence: true

  def self.most_recent(n)
    self.order(created_at: :desc).limit(n)
  end

  # Not implemented yet, but would like to figure these out
  #
  # def self.most_check_ins
  #   binding.pry
  #
  #   # from CheckIn... S
  # end
  #
  # def self.highest_rated(n)
  #   binding.pry
  # end
end
