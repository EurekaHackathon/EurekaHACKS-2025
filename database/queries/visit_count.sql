-- name: IncrementVisitsCount :one
update public.stats
    set value = value + 1
where name = 'visits' returning *;