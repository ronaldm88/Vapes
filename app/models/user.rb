class User < ActiveRecord::Base
  has_many :check_ins
  has_many :beers, through: :check_ins

  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable, :validatable

  def favorite_beers(n)
    self.check_ins.order(rating: :desc).limit(n)
  end
end
