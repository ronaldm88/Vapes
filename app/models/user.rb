class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable, :validatable

  def favorites
    binding.pry

    # Maybe select favorite 5/10 beers and display them in order of rating?
    
  end
end
