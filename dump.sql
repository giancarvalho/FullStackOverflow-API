CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"question" varchar(255) NOT NULL,
	"student_id" integer NOT NULL,
	"class_id" integer NOT NULL,
	"answered" BOOLEAN NOT NULL DEFAULT 'false',
	"submitted_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	"answer_id" integer,
	"tags" varchar(255) NOT NULL,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "students" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"class_id" integer NOT NULL,
	"token" varchar(255) NOT NULL,
	CONSTRAINT "students_pk" PRIMARY KEY ("id")
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
	"answer" text NOT NULL,
	"answered_by" integer NOT NULL,
	"answered_at" TIMESTAMP NOT NULL DEFAULT 'now()',
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("student_id") REFERENCES "students"("id");
ALTER TABLE "questions" ADD CONSTRAINT "questions_fk1" FOREIGN KEY ("answer_id") REFERENCES "answers"("id");

ALTER TABLE "students" ADD CONSTRAINT "students_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");


ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("answered_by") REFERENCES "students"("id");




