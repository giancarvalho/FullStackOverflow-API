CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"student_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	"submitted_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	"answer_id" integer,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"answer" TIME NOT NULL,
	"answered_by" integer NOT NULL,
	"answered_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"question_id" integer NOT NULL,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_id") REFERENCES "users"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") on DELETE CASCADE;

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");


ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("answered_by") REFERENCES "users"("id");

ALTER TABLE "tags" ADD CONSTRAINT "tags_fk0" FOREIGN KEY ("question_id") REFERENCES "questions"("id");





