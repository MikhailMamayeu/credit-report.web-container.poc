DOMAIN := credit-report
NAME := web-container.poc
VERSION := $(shell git rev-parse HEAD)
ROOT_DIR := $(dir $(CURDIR))
AWS_DEV_ACCOUNT := 029718257588
AWS_REGION := eu-west-1
BASE_NAME := $(DOMAIN).$(NAME).$(VERSION)
IMAGE := $(BASE_NAME).image
CONTAINER := $(BASE_NAME).container
TAR_FILESYSTEM := $(BASE_NAME).tar

### S3 ###

s3-image: # Build Docker image to generate Webpack assets
s3-image:
	docker build --build-arg HOST_TYPE=s3 -t $(IMAGE) -f $(ROOT_DIR)Dockerfile.s3 $(ROOT_DIR)

s3-build: # Generate Webpack assets in Docker container
s3-build:
	docker run --name $(CONTAINER) $(IMAGE)

s3-filesystem: # Extract filesystem from Docker container
s3-filesystem:
	docker export $(CONTAINER) > $(ROOT_DIR)$(TAR_FILESYSTEM)

s3-extract: # Extract Webpack assets from Docker filesystem
s3-extract:
	tar --strip-components=3 -xf $(ROOT_DIR)$(TAR_FILESYSTEM) -C $(ROOT_DIR) usr/src/app/dist

s3-deploy: # Deploy assets to S3
s3-deploy:
	/bin/bash -c ". aws-assume-role $(AWS_DEV_ACCOUNT) && aws s3 sync $(ROOT_DIR)dist/ s3://ctm-fcr-web-poc --region $(AWS_REGION)"

s3-clean: # Cleanup
s3-clean:
	docker rm $(CONTAINER)
	docker image rm $(IMAGE)
	rm -f $(ROOT_DIR)$(TAR_FILESYSTEM)
	rm -rf $(ROOT_DIR)dist
