class User < ActiveRecord::Base
  has_many :check_ins
  has_many :beers, through: :check_ins

  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable,
         :validatable,:omniauthable, :omniauth_providers => [:facebook]

  def self.from_omniauth(auth)
    where(uid: auth.uid[0..4]).first_or_create do |user|
      user.username = auth[:info][:email]
      user.email = auth[:info][:email]
      user.first_name = auth[:info][:name].split(" ").first
      user.last_name = auth[:info][:name].split(" ").last
      user.password = auth[:uid]
    end
  end

  def favorite_beer
    check_ins.order(rating: :desc).limit(1).first
  end
end
