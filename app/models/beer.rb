class Beer < ActiveRecord::Base

  def most_recent
    self.find(:all, :id => "id desc", :limit => 10)
  end
end
