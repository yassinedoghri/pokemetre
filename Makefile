run:
	deno run dev

db-init:
	cd database && sqlite3 pokemetre.db ".read init.sql"

db-destroy:
	cd database && sqlite3 pokemetre.db ".read destroy.sql"

commit:
	deno run commit

commit-retry:
	deno run commit --retry
