class Task < ApplicationRecord
  default_scope { order("updated_at DESC") }
  def self.first_url
    "tasks"
  end
end
